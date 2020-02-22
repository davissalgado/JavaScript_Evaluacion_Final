var calculadora = {
	
	visor: document.getElementById("display"),
	valorVisor: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false,
	
	init: (function(){
		this.asignarEventosBotones(".tecla");
		this.asignarEventosaFuncion();
	}),
	

	//Eventos de Botones
	

	asignarEventosBotones: function(selector){
		var btn = document.querySelectorAll(selector);
		for (var i = 0; i<btn.length;i++) {
			btn[i].onmouseover = this.eventoAumentaBoton;
			btn[i].onmouseleave = this.eventoNormalBoton;
			btn[i].onmousedown = this.eventoEncogeBoton; 
			btn[i].onmouseup = this.eventoAumentaBoton; 
		};
	},

	
	eventoEncogeBoton: function(event){
		calculadora.EncogeBoton(event.target);
	},

	eventoAumentaBoton: function(event){
		calculadora.AumentaBoton(event.target);
	},

	eventoNormalBoton: function(event){
		calculadora.normalBoton(event.target);
	},
	

	//Estilos de botones 
	
	
	EncogeBoton: function(elemento){
		elemento.style.transform = "scale(0.95)";
	},

	normalBoton: function(elemento){
		elemento.style.transform = "scale(1.0)";
	},
	
	AumentaBoton: function(elemento){
		var x = elemento.id;
		elemento.style.transform = "scale(1.10)";
	},





	//Funcionalidades
	
	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.insertarNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.insertarNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.insertarNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.insertarNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.insertarNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.insertarNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.insertarNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.insertarNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.insertarNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.insertarNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.insertarDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.mostrarResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},
	
	borrarPantalla: function(){ 

	    this.valorVisor = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.actualizarPantalla();
	},
	
	cambiarSigno: function(){
		if (this.valorVisor !="0") {
			var aux;
			if (this.valorVisor.charAt(0)=="-") {
				aux = this.valorVisor.slice(1);
			}	else {
				aux = "-" + this.valorVisor;
			}
		this.valorVisor = "";
		this.valorVisor = aux;
		this.actualizarPantalla();
		}
	},
	
	insertarDecimal: function(){
		if (this.valorVisor.indexOf(".")== -1) {
			if (this.valorVisor == ""){
				this.valorVisor = this.valorVisor + "0.";
			} else {
				this.valorVisor = this.valorVisor + ".";
			}
			this.actualizarPantalla();
		}
	},
	
	insertarNumero: function(valor){
		if (this.valorVisor.length < 8) {
		
			if (this.valorVisor=="0") {
				this.valorVisor = "";
				this.valorVisor = this.valorVisor + valor;
			} else {
				this.valorVisor = this.valorVisor + valor;
			}
		this.actualizarPantalla();
		}
	},
	
	ingresoOperacion: function(oper){
		this.primerValor = parseFloat(this.valorVisor);
		this.valorVisor = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.actualizarPantalla();
	},
	
	mostrarResultado: function(){

		if(!this.auxTeclaIgual){ 
			this.segundoValor = parseFloat(this.valorVisor);
			this.ultimoValor = this.segundoValor;
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
		
		} else {
			this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
	
		this.primerValor = this.resultado;
		this.valorVisor = "";
	
		if (this.resultado.toString().length < 9){
			this.valorVisor = this.resultado.toString();
		} else {
			this.valorVisor = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.auxTeclaIgual = true;		
		this.actualizarPantalla();
	
	},
	
	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-": 
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*": 
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/": 
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},
	
	actualizarPantalla: function(){
		this.visor.innerHTML = this.valorVisor;
	}
	
};

calculadora.init();