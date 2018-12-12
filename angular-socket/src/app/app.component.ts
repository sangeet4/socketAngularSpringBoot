import { Component } from '@angular/core';
// import * as Stomp from 'stompjs';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverUrl = 'http://172.23.239.86:8080/socket';
  title = 'WebSockets demo';
  stompClient;
  data;

  constructor() {
    this.initializeWebSocketConnection();
  }
  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect(
      {},
      function(frame) {
        that.stompClient.subscribe('/chat', message => {
          if (message.body) {
            that.data = message.body;
            console.log('data is ', that.data);
            console.log('message body is ', message.body);
          }
        });
      }
    );
  }

  sendMessage(message) {
    this.stompClient.send('/app/message', {}, message);
    $('#input').val('');
    console.log('inside the sendMessage');
  }
}
