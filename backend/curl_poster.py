import subprocess
import json

def post_member(member):
    member_json = json.dumps(member)
    curl_command = [
        'curl', '-X', 'POST', 'http://127.0.0.1:8000/members/',
        '-H', 'Content-Type: application/json',
        '-d', member_json
    ]
    result = subprocess.run(curl_command, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
    else:
        print(f"Success: {result.stdout}")
