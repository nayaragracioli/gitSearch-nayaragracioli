const handleNavigation = () => {
    const backButton = document.querySelector(".new-search__button");
  
    backButton.addEventListener("click", () => {
      localStorage.clear();
      location.replace("../../index.html");
    })
  }
  
  handleNavigation();