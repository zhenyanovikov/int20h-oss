git pull --rebase

docker build -t oss-backend:latest . # fixme
docker-compose -f docker-compose.yml up -d

db_password=svXsnZVVUUybzNwgdVGWJpgYFzchBw db_port=5432 make migrate-up

# Get the last commit message and URL-encode it
commit_message=$(git log -1 --pretty=%B | jq -sRr @uri)

# Send the message via Telegram using a GET request
curl "https://api.telegram.org/bot6986345040:AAFQRp67kGLdns3q1q86s2_fVkC6_Er55F0/sendMessage?chat_id=-1002084258380&text=oss%20deployed%3A%20$commit_message"