Helper = require('hubot-test-helper')
chai = require 'chai'

expect = chai.expect

helper = new Helper('../src/dadbot.js')

user = 'robot-testing-unit-alpha';

describe 'DadBot', ->
  beforeEach ->
    @room = helper.createRoom()

  afterEach ->
    @room.destroy()

  it 'responds to "im hungry"', ->
    @room.user.say('alice', 'im hungry').then =>
      expect(@room.messages).to.eql [
        ['alice', 'im hungry']
        ['hubot', '@alice Hi Hungry, I\'m hubot!']
      ]

  it 'responds to "im very hungry" with extra dadditude', ->
    @room.user.say('bob', 'im very hungry').then =>
      expect(@room.messages).to.eql [
        ['bob', 'im very hungry']
        ['hubot', '@bob Hi Mr(s) Hungry, can I call you Very?']
      ]

  it 'responds to "I AM HuNgRy"', ->
    @room.user.say('bob', 'I AM HuNgRy').then =>
      expect(@room.messages).to.eql [
        ['bob', 'I AM HuNgRy']
        ['hubot', '@bob Hi Hungry, I\'m hubot!']
      ]

  it 'does not respond to "him hungry"', ->
    @room.user.say('bob', 'him hungry').then =>
      expect(@room.messages).to.eql [
        ['bob', 'him hungry']
      ]

  it 'responds to "i am very very hungry" with extra dadditude', ->
    @room.user.say('bob', 'i am very very hungry').then =>
      expect(@room.messages).to.eql [
        ['bob', 'i am very very hungry']
        ['hubot', '@bob Hi Mr(s) Hungry, can I call you Very?']
      ]
  
  it 'responds to "i am very very"', ->
    @room.user.say('bob', 'i am very very').then =>
      expect(@room.messages).to.eql [
        ['bob', 'i am very very']
        ['hubot', '@bob Hi Very, I\'m hubot!']
      ]