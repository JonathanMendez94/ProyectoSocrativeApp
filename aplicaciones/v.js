// Creating a new Vue instance and pass in an options object.
var demo = new Vue({

    // A DOM element to mount our view model.
    el: '#main',

    // This is the model.
    // Define properties and give them initial values.
    data: {
        active:"",
        pregunta: "",
        respuesta1:"",
        respuesta2:"",
        respuesta3:"",
        respuestacorrecta:"",
        quiz:[]
    },

    // Functions we will be using.
    methods: {
        makeActive: function(item){
            // When a model is changed, the view will be automatically updated.
            this.active = item;
            /*if (item=='1111111') {
                active: 'home'
            }*/
        },
        opcionMultiple: function(){
            this.quiz.push({
                tipo:'1',
                preguntass: this.pregunta,
                opciones:{
                    o1: this.respuesta1,
                    o2: this.respuesta2,
                    o3: this.respuesta3,
                },
                correcta: this.respuestacorrecta
            });
            this.connect();
            console.log(this.quiz);
        },
        VoF: function(){
          this.quiz.push({
            tipo:'2',
            preguntass:this.pregunta,
            correcta:this.respuestacorrecta
          });
          this.connect();
          console.log(this.quiz);

        },
        respuestaCorta: function(){
          this.quiz.push({
            tipo:'3',
            preguntass:this.pregunta,
            correcta:this.respuestacorrecta
          });
          this.connect();
          console.log(this.quiz);
        },
                //metodos de conexion a WebSocket
        connect() {
              socket = new WebSocket("ws://localhost:4567/profesor");
              socket.onopen = this.openWs;
              socket.onerror = this.errorWs;
              socket.onmessage = this.messageWs;
        },
		    openWs() {
              //console.log(sw.estado + " " + ws.nombre);
              alert("Usuario conectado");
              this.sendMessage(this.quiz);
		    },
        errorWs(evt) {
              alert("Usuario fallido");
              //console.log(evt.cuestonario);
        },
        messageWs() {
              /*json = JSON.parse(evt.cuestonario);
              console.log(evt.cuestonario);*/
        },
        sendMessage(msgData) {
              json = JSON.stringify(msgData);
              socket.send(json);
        }
            
    }
            
});