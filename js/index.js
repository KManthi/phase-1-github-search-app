document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    const searchTypeButton = document.getElementById('search-type-button'); 
    let currentSearchType = 'user';
    const baseUrl = 'https://api.github.com';

    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = form.elements.search.value;

        let searchEndpoint;
        if (currentSearchType === 'user') {
            searchEndpoint = `${baseUrl}/search/users?q=${searchTerm}`;
        } else {
            searchEndpoint = `${baseUrl}/search/repositories?q=${searchTerm}`;
        }

        fetch(searchEndpoint, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        }) 
        .then(res => res.json())
        .then(data => {
            if (currentSearchType === 'user') {
                displayUsers(data.items);
            } else {
                displayRepos(data.items);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });

    
    searchTypeButton.addEventListener('click', () => {
        if (currentSearchType === 'user') {
            currentSearchType = 'repo';
            searchTypeButton.textContent = 'Search Users';
        } else {
            currentSearchType = 'user';
            searchTypeButton.textContent = 'Search Repositories';
        }
    });

    function displayUsers(users) {
        userList.innerHTML = '';

        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.login;
            userList.appendChild(li);
        });
    }

    
    function displayRepos(repos) {
        reposList.innerHTML = '';

        repos.forEach(repo => {
            const li = document.createElement('li');
            li.textContent = repo.name;
            reposList.appendChild(li);
        });
    }
});