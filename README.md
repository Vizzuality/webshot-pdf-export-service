# Webshot - PDF export service

Service to export PDF.

Requirements:

* Ubuntu
* Node JS 8.11.1

This service is designed to run using Ubuntu and Node JS. And this service will work using Chrome.

Run the following to Install Node Js and Chrome in Ubuntu.

```
sudo curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
sudo echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list
sudo apt-get install -y nodejs google-chrome-stable --no-install-recommends
```

## How to use

First install Node JS dependencies running the next command in the project directory:

```
npm install
```

To start:

```
npm start
```

To export PDF you have to open in your browser (example):

```
http://localhost:5000/webshot?filename=export.pdf&url=#{websiteURL}
```

Example to use in links:

```
<a href="http://localhost:5000/webshot?filename=export.pdf&url=#{websiteURL}" download>Export PDF</a>
```


### NGINX config

```
location /webshot {
  passenger_enabled off; // Only for rails apps
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $http_host;
  proxy_pass http://localhost:5000;
}
```
