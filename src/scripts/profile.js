const getUserFromLocalStorage = () => {
    const userInfo = JSON.parse(localStorage.getItem("@userSearch:githubUserInfo"))

    return renderUserInfo(userInfo)
}

const renderUserInfo = ({avatar_url, login}) => {
    const userImg = document.querySelector(".profile__image");
    const userLogin = document.querySelector(".profile__username");

    userImg.src = avatar_url;
    userLogin.innerText = login;
}


const handleNavigation = () => {
    const backButton = document.querySelector(".profile__change-user--button")

    backButton.addEventListener("click", () => {
        localStorage.clear()
        location.replace("../../index.html")
    })
}


const renderUserRepos = async () => {
    const {login} = JSON.parse(localStorage.getItem("@userSearch:githubUserInfo"));

    const repositories = await fetch(`https://api.github.com/users/${login}/repos`,{
        method: "GET"
    })
    .then(async (res) => {
        if(res.ok) {
            const resConverte = await res.json();
            return resConverte;
        }
    })
    const ul = document.querySelector(".profile__ul");
    ul.innerHTML = "";

    repositories.forEach((repository) => {
        const li = document.createElement("li");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");
        const a = document.createElement("a");

        h4.innerText = repository.name;
        if (!repository.description) {
            p.innerText = "Repositório sem descrição";
        } else {
            p.innerText = repository.description;
        }
        a.innerText = "Repositório";
        a.setAttribute("href", `${repository.html_url}`);
        a.setAttribute("target", "_blank");

        li.append(h4, p, a);
        ul.appendChild(li);
    })
}

getUserFromLocalStorage();
renderUserRepos();
handleNavigation();