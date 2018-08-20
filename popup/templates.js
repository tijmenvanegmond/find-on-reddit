const templates = {
    row: `
    <div class="score">
        <span>{{score}}</span>
    </div>
    <div class="info">
        <a class="title" href="{{permalink}}" title="{{title}}">{{title_ellipsized}}</a><br>
        <a class="subreddit" href="{{subreddit_link}}">{{subreddit_name}}</a><span> • posted by </span><a href="{{author_link}}">u/{{author_name}}</a><span> {{time_ago}}</span><br>
        <a href="{{permalink}}"><i class="fas fa-comment-alt"></i> {{num_comments}} comments</a>
    </div>`
}