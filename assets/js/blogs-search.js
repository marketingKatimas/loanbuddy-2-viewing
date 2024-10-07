function searchBlogs() {
    var input, filter, posts, title, i;
    input = document.getElementById('blogSearch');
    filter = input.value.toUpperCase();
    posts = document.getElementsByClassName('blogPost');

    for (i = 0; i < posts.length; i++) {
        title = posts[i].getAttribute('data-title');
        if (title.toUpperCase().indexOf(filter) > -1) {
            posts[i].style.display = "";
        } else {
            posts[i].style.display = "none";
        }
    }
}

function resetBlogs() {
  if (document.getElementById('blogSearch').value != '') {
    return;
  }
  document.getElementById('blogSearch').value = '';
  
  // Show all blog posts
  var posts = document.getElementsByClassName('blogPost');
  for (var i = 0; i < posts.length; i++) {
      posts[i].style.display = "";
  }
}
