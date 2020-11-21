# `node-tar-issue`

[`tar`](https://github.com/npm/node-tar) never emits `error`/`close` on extracting errors with files greater or equals than `31745 bytes` with `strict: false`

## Reproduction

- the first complete is extracting in a new directory
- the second complete is trying to overwrite to the previously created directory

```sh
$ npm install
$ bash ./run.sh
31740 written in demo-in/input.txt
complete
complete
31741 written in demo-in/input.txt
complete
complete
31742 written in demo-in/input.txt
complete
complete
31743 written in demo-in/input.txt
complete
complete
31744 written in demo-in/input.txt
complete
complete
31745 written in demo-in/input.txt
complete
31746 written in demo-in/input.txt
complete
```

