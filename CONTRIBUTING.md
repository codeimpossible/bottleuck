
Bottleuck has some light rules that if you follow, should speed up the acceptance of any pull request you submit.

## Documentation Changes
If you notice any problems with the docs, please fix it and it'll get merged ASAP. Small changes - spelling and grammar - can just be done via "Edit This File" in github. For larger changes, use a pull request as outlined below.

## Sending A Pull Request
Sending a [pull request](https://help.github.com/articles/using-pull-requests/) is pretty much the only way to get your changes into bottleuck. Patches sent via email will probably just get ignored, or worse, forgotten about entirely.

However, just creating a pull request alone won't be enough for whoever reviews it to know whether it's a good idea to merge it. They'll need the context of the changes, e.g. "What are you fixing?", "Why does this change need to happen?"

### Branches
Bottleuck uses the [gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow/) to handle branching. Basically, all branches should be created off of the `develop` branch. The `master` branch is reserved for code that has been deployed to production. Any PRs opened up against the `master` branch will be closed and we'll ask for you to re-open against `develop`.

And that's basically all there is to it. Happy contributing!
