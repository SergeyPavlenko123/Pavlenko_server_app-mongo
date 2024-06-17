const btnRemove = document.querySelector(".button-remove");
const btnEdit = document.querySelector(".edit-button");

try {
  btnRemove.addEventListener("click", () => {
    deleteItem(btnRemove.dataset.id, btnRemove.closest(".user-page"));
  });
} catch (err) {}

function deleteItem(id, userCard) {
  let url = "/users/" + id;
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", url);
  xhr.send();

  xhr.onload = () => {
    userCard.remove();
    window.location.replace("/users");
  };
}
