from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()

    user_message = data.get('message', '')

    if 'hello' in user_message.lower():
        reply = 'Hi there! How can I assist you today?'
    elif 'bye' in user_message.lower():
        reply = 'Goodbye! Have a greate day!'

    else:
        reply = f'You said: {user_message}'
    return jsonify({'response': reply})

if __name__ == '__main__':
    app.run(debug=True, port=5000)