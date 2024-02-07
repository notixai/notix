from flask import Flask, make_response, request
import requests , time, json
from dotenv import load_dotenv
import assemblyai as aai
import os

load_dotenv()

app = Flask(__name__)

base_url = 'https://api.assemblyai.com/v2'

headers = {
  'authorization': os.environ['ASSEMBLYAI_API_KEY'],
}

@app.route('/transcribe', methods=['POST'])
def transcript():
  # Method 1 - Uses AssemblyAI Python requests

  # file = request.files['file']
  # file_content = file.read(5242880)
  # response = requests.post(base_url + '/upload', headers=headers,data=file_content)
  # upload_url = response.json()['upload_url']
  # data ={
  #   'audio_url': upload_url,
  # }
  # transcript_url = requests.post(base_url + '/transcript', headers=headers, json=data)
  # transcript_id = transcript_url.json()['id']
  # polling_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"

  # while True:
  #   response = requests.get(polling_endpoint, headers=headers).json()
  #   status = response['status']
  #   if status == 'completed':
  #     print('Transcription is complete')
  #     print(response['text'])
  #     break
  #   elif status == 'error':
  #     raise RuntimeError(f"Transcription failed: {response['error']}")
  #   else:
  #     time.sleep(5)
  # return response['text']

  # Method 2 - Uses AssemblyAI Python SDK

  file = request.files['file']
  file.save(file.filename)
  aai.settings.api_key = os.environ['ASSEMBLYAI_API_KEY']
  config = aai.TranscriptionConfig(speaker_labels=True, auto_highlights=True)
  transcriber = aai.Transcriber()
  transcript = transcriber.transcribe(file.filename, config=config)
  result = ''
  for utterance in transcript.utterances:
    result += "Speaker " + str(utterance.speaker) + ": " + utterance.text + "\n"
  print(result)
  response = make_response(result, 200)
  response.mimetype = "text/plain"
  return response


@app.route('/summarize', methods=['POST'])
def summarize():
  return None

if __name__ == '__main__':
  app.run(debug=True, host='127.0.0.1')