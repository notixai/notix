from flask import Flask, jsonify, make_response, request
from dotenv import load_dotenv
import openai, os, requests, time

load_dotenv()

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 1000 * 1024 * 1024

headers = {
  'authorization': os.environ['ASSEMBLYAI_API_KEY'],
}

base_url = os.environ['ASSEMBLYAI_BASE_URL']

@app.route('/transcribe', methods=['POST'])
def transcript():
  try:
    # TODO: check if the file is of type audio or video
    file = request.files.get('media')
    # check if the post request has the file part
    if not file:
      return jsonify({"error": "No audio or video file provided"}), 400
    # read 1GB of the file
    file_content = file.read(1000 * 1024 * 1024)
    # upload the file to AssemblyAI
    response = requests.post(base_url + 'upload', headers=headers, data=file_content)
    # get the upload url
    upload_url = response.json()['upload_url']
    # configure the transcription
    data = {
      'audio_url': upload_url,
      'speaker_labels': True,
      'auto_highlights': True,
      'word_boost': ["ChatGPT"],
      'boost_param': 'high',
      "auto_chapters": True,
      "content_safety": True,
      # "summarization": True,
      # "summary_model": "informative",
      # "summary_type": "bullets"
    }
    # start the transcription
    transcript_url = requests.post(base_url + 'transcript', headers=headers, json=data)
    # get the transcript id
    transcript_id = transcript_url.json()['id']
    # polling endpoint to check the status of the transcription
    polling_endpoint = f"{base_url}transcript/{transcript_id}"

    while True:
      # poll the endpoint
      response = requests.get(polling_endpoint, headers=headers).json()
      # check the status of the transcription
      status = response['status']
      transcript = ''
      # if the transcription is complete, break the loop
      if status == 'completed':
        print('Transcription is complete\n\n')
        for utterance in response['utterances']:
          transcript += f"Speaker {utterance['speaker']}: {utterance['text']}\n"
        print(transcript)
        break
      # if the transcription failed, raise an error
      elif status == 'error':
        raise RuntimeError(f"Transcription failed: {response['error']}")
      # else, wait for 3 seconds and poll the endpoint again
      else:
        time.sleep(3)
    return jsonify({"transcript": transcript}), 200
  except Exception as error:
    # return an error message
    return jsonify({"Transcription error": error}), 500

@app.route('/summarise', methods=['POST'])
def summarise():
  try:
      openai.api_key = os.environ('OPENAI_API_KEY')

      completion = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[

            # TODO:  Add meeting minutes
          {"role": "user", "content":  """I will input the transcript for a YouTube video discussing ChatGPT. Correct any errors you may find in the transcript. Provide a bullet point summary of these notes as a good student would for their class.
          Here's the transcript: {}
        """.format(request.body)},

      ]
    )
      res = make_response(completion.choices[0].message.content, 200)
      res.mimetype = "text/plain"
  
      return res
  
  except Exception as error:
    return jsonify({"Summarisation error": error}), 500

if __name__ == '__main__':
  app.run(debug=True, host='127.0.0.1', port=12009)