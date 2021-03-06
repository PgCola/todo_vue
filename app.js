Vue.config.performance = false;
Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;

var STORAGE_KEY = 'vue_todo_pgorka'
var todoStorage ={

	fetch: function(){
		var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) ||
		('[{"text": "Po prawej jak już mnie nie potrzebujesz", "complete": false, "edit": false}, {"text": "Po lewej przycisk jak już zrobione", "complete": false, "edit": false}, {"text": "Kliknij na mnie żeby edytowac", "complete": false, "edit": false}, {"text": "Na górze dodajesz task", "complete": false, "edit": false}]').toString('utf-8')
		);
		for(var i=0; i+1<=todos.length; i++){
			todos[i]['edit'] = false;
		}
		return todos;
	},
	save: function(todos){
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}
}



var todo = new Vue({
	el:"#todo",
	data:{
		todoShowKey: 'all',
		txtInput:'',
		i: 1,
		todos:{
			text: '',
			complete: false,
		},
		todos: todoStorage.fetch(),
		
	},
	watch: {
		todos:{
		handler: function(todos) {
	        todoStorage.save(todos);
	      }
		}
	},
	computed:{
		reverse: function(){
			return this[this.todoShowKey].slice().reverse();
		},
		all: function(){
			return this.todos;
		},
		incomplete: function(){
			return this.todos.filter((todos) => todos.complete == false);
		},
		complete: function(){
			return this.todos.filter((todos) => todos.complete == true);
		}
	},
	methods:{
		addTodo: function(){
			if(this.txtInput != ""){
				this.todos.push({text: this.txtInput, complete: false, edit: false});
				return this.txtInput = "";
			}
			
		},
		deleteTodo: function(todo){
			this.todos.splice(this.todos.indexOf(todo), 1);
		},

		completeTodo: function(todo){
			var index = this.todos.indexOf(todo);
			var place = this.todos[index];
			var bool = place["complete"];


			Vue.delete(place, "complete");
			Vue.set(place, "complete", !bool);
		 	},
		 editTodo: function(todo){
		 	var index = this.todos.indexOf(todo);
			var place = this.todos[index];
			var bool = place["edit"];

			Vue.delete(place, "edit");
			Vue.set(place, "edit", !bool);
		 },
		 filterTodo: function(filter){
		 	this.show = filter;
		 },
		 exited: function(todo){
		 	var index = this.todos.indexOf(todo);
			var place = this.todos[index];
			var bool = place["edit"];

			Vue.delete(place, "edit");
			Vue.set(place, "edit", false);
		 },
		getFilClass: function(filter){
			return{
				'fil_active': filter==this.todoShowKey,
				'filter_button': filter!=this.todoShowKey
			}

		},
		getTickClass: function(){

		}
	}



});