<script lang="ts">
	import axios from '$lib/api/axios.js';
    import userStore from '$lib/store/Store';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let error = '';
    $: email || password, error = '';

    async function handleSubmit(e: Event) {
        e.preventDefault();

        try {
            const response = await axios.post('/users/login', {
                email,
                password,
            }, {
                withCredentials: true,
            });

            userStore.set({
                _id: response.data.user._id,
                email: response.data.user.email,
                role: response.data.user.role,
                token: response.data.token,
            });
            
            if(response.data.user.role === 'admin') {
                goto('/admin');
            } else {
                goto('/profile');
            }
            
        } catch (err: any) { 
            if(!err.response){
                error = 'Server is down. Please try again later.'
            } else if(err.response.status === 401){
                error = 'Invalid credentials. Please try again.'
            } else {
                error = 'Invalid credentials. Please try again.'
            }
        }
    }


</script>

<section>
    <div class='loginContainer'>
        <h3>Sign In</h3>
        <form
            class='form-horizontal'
            autoComplete='off'
            on:submit={handleSubmit}>
            <div class='form-group'>
                <label for='email' class='visually-hidden'>
                    Email address
                </label>
                <input
                    type='email'
                    class='form-control'
                    id='email'
                    name='email'
                    placeholder='Email address'
                    autoComplete='off'
                    bind:value={email}
                />
            </div>
            <div class='form-group'>
                <label for='password' class='visually-hidden'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    autoComplete='off'
                    class='form-control'
                    bind:value={password}
                />
            </div>
            <button type='submit' class='btn btn-primary'>
                Login
            </button>
        </form>
        <p
            class={error ? 'error' : 'visually-hidden'}>
            {error}
        </p>
        <p>For a demo, use the following credentials:</p>
        <div class='userDemo'>
            <div class='credentials'>
                <p>Demo User</p>
                <p>Email: user@demo.com</p>
                <p>Password: user</p>
            </div>
            <div class='credentials'>
                <p>Admin User</p>
                <p>Email: admin@demo.com</p>
                <p>Password: admin</p>
            </div>
        </div>
    </div>
</section>

<style></style>