curl --location 'http://127.0.0.1:5000/api/timeline_post' \
--form 'name="Vuong Ho"' \
--form 'email="hochivuong2002@gmail.com"' \
--form 'content="Testing endpoint"'

curl --location --request GET 'http://127.0.0.1:5000/api/timeline_post'
