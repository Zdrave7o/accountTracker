from flask import Flask 

app = Flask(__name__)

@app.route('/')
def home():
    a = 0
    return'<h1>Hello world</h1>' 

if __name__ == "__main__":
    app.run(debug=True)