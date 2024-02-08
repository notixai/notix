from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

@app.route('/transcribe', methods=['GET', 'POST'])
def transcribe():
    try:
        # TODO: add transcription code
    except Exception as e:
        return jsonify({error: "Transcription error"}), 500

@app.route('/summarise', methods=['GET'])
def summarise():
    try:
        # TODO: add summarisation AI code
    except Exception as e:
       return jsonify({error: "Summarisation error"}), 500

if __name__ == '__main__':
  app.run(debug=True, host='127.0.0.1')