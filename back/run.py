from blog import create_app


app = create_app('config/settings.py')
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5996)
