```markdown
# NestJS WebSocket Application with Docker

This project demonstrates a NestJS application that uses WebSockets to handle SMS-like messaging and acknowledgment. The application is containerized using Docker and can be easily deployed on any server, such as an EC2 instance.

The project includes the following:

- **NestJS WebSocket Server**: A WebSocket gateway that listens for incoming events and broadcasts messages.
- **Docker Container**: The application is packaged in a Docker container for easy deployment.
- **HTML Client**: A simple HTML file to connect to the WebSocket server and test real-time message exchange.

---

## Prerequisites

To run this project, you will need the following:

- **Docker**: To run the application in a containerized environment.
- **Node.js and npm**: Required to run the NestJS application locally before containerization (if needed).
- **Docker Hub Account**: If you're pulling the image from Docker Hub, you'll need an account.
- **EC2 Instance (or any server)**: To deploy the Docker container on a cloud instance.

---

## How to Use

### **1. Clone the Repository**

```bash
git clone https://github.com/ChinmayKuJena/webSocket_NestJs.git
cd webSocket_NestJs
```

### **2. Build and Run the Application Locally (Optional)**

To build and run the NestJS app locally (before Dockerizing):

```bash
npm install
npm run start
```

The app will be available at `http://localhost:3000`.

### **3. Dockerize the Application**

1. Pull the Docker image:

   ```bash
   docker pull chinmay0940/nestjs-app:latest
   ```

2. Run the Docker container:

   ```bash
   docker run -d -p 3000:3000 chinmay0940/nestjs-app:latest
   ```

---

### **4. Use the WebSocket Client**

1. Open the `client.html` file in any browser.
2. The WebSocket client will attempt to connect to the server and listen for events. If your EC2 instance is running, update the `client.js` to point to your EC2's public IP:

   ```javascript
   const socket = io('http://<ec2-public-ip>:3000');
   ```

3. The client will display real-time messages as it connects to the WebSocket server and listens for the `'sms:send'` and `'sms:acknowledge'` events.

---

## API Endpoints

### **1. `/sms/send`** (POST)

- **Description**: Receives a message payload and broadcasts it to all WebSocket clients.
- **Request Body**:

   ```json
   {
     "to": "string",
     "message": "string"
   }
   ```

- **Response**:

   ```json
   {
     "status": "Message sent",
     "data": { "to": "string", "message": "string" }
   }
   ```

### **2. `/sms/acknowledge`** (POST) ==> TODO

- **Description**: Receives an acknowledgment payload and broadcasts it to all WebSocket clients.
- **Request Body**:

   ```json
   {
     "status": "string",
     "messageId": "string"
   }
   ```

- **Response**:

   ```json
   {
     "status": "Acknowledgment received",
     "data": { "status": "string", "messageId": "string" }
   }
   ```

---

