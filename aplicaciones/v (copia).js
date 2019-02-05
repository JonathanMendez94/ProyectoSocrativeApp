// Creating a new Vue instance and pass in an options object.
var demo = new Vue({

    // A DOM element to mount our view model.
    el: '#main',

    // This is the model.
    // Define properties and give them initial values.
    data: {
        active:"",
        linkCuestionario:"",
        pregunta: "",
        respuesta1:"",
        respuesta2:"",
        respuesta3:"",
        respuestacorrecta:"",
        JSONobj:{},
        quiz:[]
    },
    data1: {
        
        pregunta: "",
        respuesta1:"",
        
        quiz1:[]
    },

    // Functions we will be using.
    methods: {
        makeActive: function(item){


            this.active = item;
        },
        opcionMultiple: function(){
            this.quiz.push({
                
                linkCuestionario: this.linkCuestionario,
               
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
            
            preguntass:"",
            correcta:"this.JSONobj.respuestacorrecta",
          });
          this.connect();

          
          console.log(this.JSONobj.length);
                      console.log(this.JSONobj);
                      console.log(this.JSONobj.tipo);
          

        

         

        },
                //metodos de conexion a WebSocket
        connect() {
              socket = new WebSocket("ws://localhost:4567/estudiante");
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
        messageWs(evt) {
              var jvs=JSON.stringify(eval("("+ evt.data + ")"));
              this.JSONobj=JSON.parse(jvs);
              console.log(this.JSONobj);
        },

        sendMessage(msgData) {
              json = JSON.stringify(msgData);
              socket.send(json);
        }
            
    }
            
});

var a = new Vue({


});