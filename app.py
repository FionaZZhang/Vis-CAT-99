from flask import Flask, send_from_directory, request, jsonify

app = Flask(__name__, static_folder='./vue-app/dist', static_url_path='/')


@app.route('/')
def serve_vue_app():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/send-total', methods=['POST'])
def receive_total():
    data = request.get_json()
    score = data.get('score')
    id = data.get('id')
    print(f"{score}, {id}")
    # Respond with a success message or other data
    response_data = {'message': 'Data received successfully'}
    return jsonify(response_data)


if __name__ == '__main__':
    app.run(debug=True)
