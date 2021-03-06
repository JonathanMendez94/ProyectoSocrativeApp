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
                linkCuestionario: this.linkCuestionario,
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
            linkCuestionario: this.linkCuestionario,
            preguntass:this.pregunta,
            correcta:this.respuestacorrecta
          });
          this.connect();
          console.log(this.quiz);

        },
        respuestaCorta: function(){
          this.quiz.push({
            tipo:'3',
            linkCuestionario: this.linkCuestionario,
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
