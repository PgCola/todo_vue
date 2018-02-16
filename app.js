// var filters = {
//   all: function(todos) {
//     return todos;
//   },
//   complete: function(todos) {
//     return todos.filter(function(todo) {
//       return todo.complete;
//     });
//   },
//   incomplete: function(todos) {
//     return todos.filter(function(todo) {
//       return !todo.complete;
//     });
//   }
// }
var STORAGE_KEY = 'vue_todo_pgorka'
var todoStorage ={

	fetch: function(){
		var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) ||
		('[{"text": "Na górze dodajesz task", "complete": false, "edit": false},{"text": "Klinknij dwa razy na mnie żeby edytowac", "complete": false, "edit": false},{"text": "Po lewej przycisk jak już zrobione", "complete": false, "edit": false},{"text": "Po prawej jak już mnie nie potrzebujesz", "complete": false, "edit": false}]').toString('utf-8')
		);
		return todos;
	},
	save: function(todos){
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}
}


var todo = new Vue({
	el:"#todo",
	data:{
		txtInput:'',
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
			console.log(place["complete"]);
		 	},
		 editTodo: function(todo){
		 	var index = this.todos.indexOf(todo);
			var place = this.todos[index];
			var bool = place["edit"];

			Vue.delete(place, "edit");
			Vue.set(place, "edit", !bool);
			console.log(place["edit"]);
		 },
		 exited: function(todo){
		 	var index = this.todos.indexOf(todo);
			var place = this.todos[index];
			var bool = place["edit"];

			Vue.delete(place, "edit");
			Vue.set(place, "edit", false);
		 },
		checker: function(){
			console.log(localStorage.getItem(STORAGE_KEY));
		}
	}



})