var posts=["2024/04/19/hello-world/","2024/05/03/test1/","2024/04/03/hikariplan/","2024/05/03/test10/","2024/05/03/test4/","2024/05/03/test2/","2024/05/03/test3/","2024/05/03/test5/","2024/05/03/test6/","2024/05/03/test7/","2024/05/03/test8/","2024/05/03/test9/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};