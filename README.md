# ES6 Template Generator

Template to generate new ES6 projects

## Table of Contents

- [Requisites](#requisites)
- [Packages](#packages)
- [Usage](#usage)
- [IDE Support](#ide-support)
- [References](#references)
- [TODO](#todo)

## Requisites

- Node 10.13.0
- NVM 6.4.1

## Packages

- Babel
- Jest
- Eslint
- Prettier
- Debug
- Commitizen
- Standard Version

## Usage

Clone the project

```bash
$ git clone git@github.com:jatap/es6-template-generator.git
```

Create a new function in your ```~/.zshrc``` or ```~/.bashrc``` to source ```init``` file

```bash
# ~/.zshrc or ~/.bashrc

function new_es6_project() {
  source <cloned_project>/init <cloned_project>
}
```

Create a new folder

```bash
$ mkdir new_amazing_e6_package && cd $_
```

Execute ES6 Template Generator

```bash
$ new_es6_project
```

## IDE Support

Support for debug in VSCode

- Debug file (source)
- Debug file (compiled)
- Debug test
- Debug tests
- Debug tests (attach)
- Debug tests (launch & attach)

## References

- [ES6 Cli Template Generator](https://github.com/jatap/es6-cli-template-generator)

## TODO

- [ ] Move to yeoman
