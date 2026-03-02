import React, { useState } from 'react';
import { Code, X, Copy, Check, FileCode, FileJson, Database } from 'lucide-react';

const apiTemplates = {
  'Fetch API': {
    lang: 'JavaScript',
    code: `async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token'
      }
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Usage
fetchData('https://api.example.com/data')
  .then(data => console.log(data));`
  },
  'Axios': {
    lang: 'JavaScript',
    code: `import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);

// GET request
const getData = async (id) => {
  return await api.get(\`/endpoint/\${id}\`);
};

// POST request
const postData = async (data) => {
  return await api.post('/endpoint', data);
};`
  },
  'cURL': {
    lang: 'Shell',
    code: `# GET request
curl -X GET "https://api.example.com/data" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token"

# POST request  
curl -X POST "https://api.example.com/data" \\
  -H "Content-Type: application/json" \\
  -d '{"key": "value"}'

# PUT request
curl -X PUT "https://api.example.com/data/1" \\
  -H "Content-Type: application/json" \\
  -d '{"key": "new-value"}'

# DELETE request
curl -X DELETE "https://api.example.com/data/1"

# With authentication
curl -X GET "https://api.example.com/private" \\
  -u username:password`
  },
  'Python Requests': {
    lang: 'Python',
    code: `import requests
from requests.auth import HTTPBasicAuth

class APIClient:
    def __init__(self, base_url, token=None):
        self.base_url = base_url
        self.session = requests.Session()
        if token:
            self.session.headers.update({'Authorization': f'Bearer {token}'})
    
    def get(self, endpoint, params=None):
        response = self.session.get(
            f'{self.base_url}/{endpoint}',
            params=params
        )
        response.raise_for_status()
        return response.json()
    
    def post(self, endpoint, data=None, json=None):
        response = self.session.post(
            f'{self.base_url}/{endpoint}',
            data=data,
            json=json
        )
        response.raise_for_status()
        return response.json()
    
    def put(self, endpoint, data=None, json=None):
        response = self.session.put(
            f'{self.base_url}/{endpoint}',
            data=data,
            json=json
        )
        response.raise_for_status()
        return response.json()
    
    def delete(self, endpoint):
        response = self.session.delete(f'{self.base_url}/{endpoint}')
        response.raise_for_status()
        return response.json()

# Usage
client = APIClient('https://api.example.com', 'your-token')
data = client.get('users', params={'page': 1})`
  },
  'Go HTTP': {
    lang: 'Go',
    code: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "time"
)

type Client struct {
    BaseURL   string
    Token     string
    HTTPClient *http.Client
}

func NewClient(baseURL, token string) *Client {
    return &Client{
        BaseURL: baseURL,
        Token:   token,
        HTTPClient: &http.Client{
            Timeout: time.Second * 30,
        },
    }
}

func (c *Client) doRequest(method, endpoint string, body interface{}) ([]byte, error) {
    var reqBody *bytes.Reader
    if body != nil {
        jsonBody, err := json.Marshal(body)
        if err != nil {
            return nil, err
        }
        reqBody = bytes.NewReader(jsonBody)
    } else {
        reqBody = bytes.NewReader([]byte{})
    }
    
    req, err := http.NewRequest(method, c.BaseURL+endpoint, reqBody)
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Content-Type", "application/json")
    if c.Token != "" {
        req.Header.Set("Authorization", "Bearer "+c.Token)
    }
    
    resp, err := c.HTTPClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    bodyBytes, err := io.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }
    
    if resp.StatusCode >= 400 {
        return nil, fmt.Errorf("status: %d, body: %s", resp.StatusCode, string(bodyBytes))
    }
    
    return bodyBytes, nil
}

func (c *Client) Get(endpoint string) (map[string]interface{}, error) {
    data, err := c.doRequest("GET", endpoint, nil)
    if err != nil {
        return nil, err
    }
    
    var result map[string]interface{}
    json.Unmarshal(data, &result)
    return result, nil
}

func (c *Client) Post(endpoint string, data interface{}) (map[string]interface{}, error) {
    responseData, err := c.doRequest("POST", endpoint, data)
    if err != nil {
        return nil, err
    }
    
    var result map[string]interface{}
    json.Unmarshal(responseData, &result)
    return result, nil
}`
  },
  'Node Express': {
    lang: 'Node.js',
    code: `const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const response = await axios.get(\`https://api.example.com/users?page=\${page}&limit=\${limit}\`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(\`https://api.example.com/users/\${id}\`);
    res.json(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;
    const response = await axios.post('https://api.example.com/users', userData);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const response = await axios.put(\`https://api.example.com/users/\${id}\`, userData);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(\`https://api.example.com/users/\${id}\`);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`
  },
  'PHP cURL': {
    lang: 'PHP',
    code: `<?php

class APIClient {
    private $baseURL;
    private $token;
    
    public function __construct($baseURL, $token = null) {
        $this->baseURL = $baseURL;
        $this->token = $token;
    }
    
    private function getHeaders() {
        $headers = ['Content-Type: application/json'];
        if ($this->token) {
            $headers[] = 'Authorization: Bearer ' . $this->token;
        }
        return $headers;
    }
    
    public function get($endpoint, $params = []) {
        $url = $this->baseURL . $endpoint;
        if (!empty($params)) {
            $url .= '?' . http_build_query($params);
        }
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->getHeaders());
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($response, true);
    }
    
    public function post($endpoint, $data) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseURL . $endpoint);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->getHeaders());
 = curl_exec($        
        $responsech);
        curl_close($ch);
        
        return json_decode($response, true);
    }
    
    public function put($endpoint, $data) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseURL . $endpoint);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->getHeaders());
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($response, true);
    }
    
    public function delete($endpoint) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseURL . $endpoint);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->getHeaders());
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($response, true);
    }
}

// Usage
$client = new APIClient('https://api.example.com', 'your-token');
$users = $client->get('users', ['page' => 1]);
$newUser = $client->post('users', ['name' => 'John', 'email' => 'john@example.com']);`
  },
  'Rust reqwest': {
    lang: 'Rust',
    code: `use reqwest::Client;\nuse serde::{Deserialize, Serialize};\nuse std::time::Duration;\n\n#[derive(Serialize, Deserialize)]\nstruct User {\n    id: u32,\n    name: String,\n    email: String,\n}\n\n#[derive(Serialize)]\nstruct NewUser {\n    name: String,\n    email: String,\n}\n\nstruct APIClient {\n    client: Client,\n    base_url: String,\n    token: Option<String>,\n}\n\nimpl APIClient {\n    fn new(base_url: &str) -> Self {\n        let client = Client::builder()\n            .timeout(Duration::from_secs(30))\n            .build()\n            .unwrap();\n        \n        Self {\n            client,\n            base_url: base_url.to_string(),\n            token: None,\n        }\n    }\n    \n    fn with_token(mut self, token: &str) -> Self {\n        self.token = Some(token.to_string());\n        self\n    }\n    \n    fn get<T: for<'de> Deserialize<'de>>(&self, endpoint: &str) -> Result<T, Box<dyn std::error::Error>> {\n        let url = format!("{}{}", self.base_url, endpoint);\n        let mut request = self.client.get(&url);\n        \n        if let Some(token) = &self.token {\n            request = request.header("Authorization\", format!(\"Bearer {}\", token));\n        }\n        \n        let response = request.send()?;\n        Ok(response.json()?)\n    }\n    \n    fn post<T: for<'de> Deserialize<'de>, B: Serialize>(\n        &self,\n        endpoint: &str,\n        body: &B,\n    ) -> Result<T, Box<dyn std::error::Error>> {\n        let url = format!("{}{}", self.base_url, endpoint);\n        let mut request = self.client.post(&url);\n        \n        if let Some(token) = &self.token {\n            request = request.header("Authorization\", format!(\"Bearer {}\", token));\n        }\n        \n        let response = request.json(body).send()?;\n        Ok(response.json()?)\n    }\n}\n\n// Usage\nlet client = APIClient::new(\"https://api.example.com\")\n    .with_token(\"your-token\");\n\nlet users: Vec<User> = client.get(\"/users\")?;\nlet new_user: User = client.post(\"/users\", &NewUser {\n    name: \"John\".to_string(),\n    email: \"john@example.com\".to_string(),\n})?;`
  },
};

export default function APICodeGenerator({ onClose }) {
  const [selected, setSelected] = useState('Fetch API');
  const [copied, setCopied] = useState(false);

  const templates = Object.keys(apiTemplates);

  const copyCode = () => {
    navigator.clipboard.writeText(apiTemplates[selected].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-indigo-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-500/20">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-500" />
          <span className="text-white font-semibold">API Code Generator</span>
        </div>
        <div className="flex gap-2">
          <button onClick={copyCode} className="p-1 hover:bg-gray-700 rounded">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      {/* Template List */}
      <div className="flex border-b border-gray-800 overflow-x-auto">
        {templates.map(template => (
          <button
            key={template}
            onClick={() => setSelected(template)}
            className={`px-4 py-2 text-sm whitespace-nowrap ${
              selected === template 
                ? 'bg-gray-800 text-white border-b-2 border-indigo-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {template}
          </button>
        ))}
      </div>
      
      {/* Code Display */}
      <div className="flex-1 overflow-auto p-3">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-700">
            <span className="text-indigo-400 text-xs">{apiTemplates[selected].lang}</span>
            <span className="text-gray-500 text-xs">{apiTemplates[selected].code.split('\n').length} lines</span>
          </div>
          <pre className="p-4 text-xs text-gray-300 overflow-x-auto">
            <code>{apiTemplates[selected].code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
