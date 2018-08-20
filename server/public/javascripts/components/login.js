Vue.component('login', {
    template: `
    <div class="container">
        <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" v-model='username'>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model='password'>
        </div>
        <button type="submit" class="btn btn-primary" @click="this.signIn">Submit</button>
    </form>
    </div>
    `, 
    data () {
        return {
            username: '', 
            password: ''
        }
    }, 
    methods: {
        signIn () {
            event.preventDefault()
            const formSignIn = {
                username: this.username,
                password: this.password
            }

            console.log(formSignIn)
            axios.post('http://localhost:3000/user/request_token', formSignIn)
            .then(userData => {
                console.log('---', userData)
                localStorage.setItem('token', userData.data.token)
                window.location.href = 'http://localhost:8080/index.html'
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
})