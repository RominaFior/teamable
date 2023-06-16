<template>
    <div v-show="!isEditMode">
        <h1>User profile</h1>
        <img :src="image" alt="profile" />

        <span>Name: </span><b id="name">{{ name }}</b>
        <hr />

        <span>Email: </span><b id="email">{{ email }}</b>
        <hr />

        <span>Interests: </span><b id="interests">{{ interests }}</b>
        <hr />

        <button @click="handleEditProfile">Edit Profile</button>
    </div>

    <div v-show="isEditMode">
        <h1>User profile</h1>
        <img :src="image" alt="profile" />

        <span>Name: </span>
        <input type="text" v-model="name" id="input-name" />
        <hr />

        <span>Email: </span>
        <input type="text" v-model="email" id="input-email" />
        <hr />

        <span>Interests: </span>
        <input type="text" v-model="interests" id="input-interests" />
        <hr />

        <button @click="handleUpdateProfile">Update Profile</button>
    </div>
</template>
<script>
import image from '../assets/images/profile.jpg';

export default {
    name: 'App',
    data() {
        return {
            image: image,
            name: '',
            email: '',
            interests: '',
            isEditMode: false,
        }
    },
    async created() {
        const userData = await this.fetchProfile();
        this.name = userData.name;
        this.email = userData.email;
        this.interests = userData.interests;
    },
    methods: {
        handleEditProfile() {
            this.isEditMode = true
        },

        async handleUpdateProfile() {
            const payload = {
                name: this.name,
                email: this.email,
                interests: this.interests
            };
            const resJson = await this.updateUserProfile(payload);
            console.log(resJson.error);
            this.isEditMode = false
        },

        async fetchProfile() {
            const res = await fetch('get-profile')
            return await res.json()
        },
        
        async updateUserProfile(payload) {
            const res = await fetch('update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            return await res.json()
        }
    }
}
</script>
<style>
img {
    width: 400px;
    display: block;
    margin-bottom: 40px;
}

div {
    width: 80%;
    margin: 40px auto;

}

hr {
    width: 400px;
    margin: 25px 0;
}

button {
    width: 160px;
    font-size: 15px;
    height: 45px;
    border-radius: 5px;
}

button:hover {
    cursor: pointer;
}

input {
    width: 200px;
    font-size: 15px;
    padding: 10px;
}

.datepicker {
    margin: 0 auto;
}
</style>