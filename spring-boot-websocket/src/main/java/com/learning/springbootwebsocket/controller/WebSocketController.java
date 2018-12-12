package com.learning.springbootwebsocket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template) {
        this.template = template;
    }

    // endpoint for acccepting the messages coming from frontend and will send them back to topic "/chat"
    @MessageMapping("/message")
    public void onReceiveMessage(String message) throws Exception {
        System.out.println("data incoming is " + message);
        this.template.convertAndSend("/chat", message);
    }
}
