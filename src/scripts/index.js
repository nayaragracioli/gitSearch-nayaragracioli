const baseUrl = "https://api.github.com/users";

const fetchUserData = async (userName) => {
    const userData = await fetch(`${baseUrl}/${userName}`, {
        method: "GET"
    })
        .then(async (res) => {
            
            if (res.ok) {
                const githubUserInfo = await res.json();

                localStorage.setItem("@userSearch:githubUserInfo", JSON.stringify(githubUserInfo));

                location.replace("./src/pages/profile.html");

                return githubUserInfo;
            } else {
                location.replace("./src/pages/error.html");
                return "Usuário não encontrado, tente novamente."
            }
        })

    return userData;
}

const handleSearch = () => {
    const input = document.querySelector(".index__input");
    const button = document.querySelector(".index__button");

    button.addEventListener("click", () => {

        const userValue = input.value;

        localStorage.setItem("@userSearch:githubUserInfo", userValue);

        fetchUserData(userValue);
    })
}

handleSearch()

