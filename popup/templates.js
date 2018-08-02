const templates = {
    row:`
    <div class="score">
        <span>{{score}}</span>
    </div>
    <div class="info">
        <a class="title" href="{{permalink}}">{{title}}</a>
        <span>
            <a class="subreddit" href="{{subreddit_link}}">{{subreddit_name}}</a> • posted by
            <a href="{{author_link}}">u/{{author_name}}</a> {{time_ago}}
        </span>
        <a href="{{permalink}}">{{num_comments}} comments</a>
    </div>`
}