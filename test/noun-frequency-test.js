import test from 'ava'
import { MeCabFrequency } from '../src/noun-frequency'

test.beforeEach(t => {
  t.context.meCab = new StubMeCabFrequency()
})

test('single noun should be true', t => {
  t.true(t.context.meCab.isSingleNoun('アイドルマスター', '名詞', '固有名詞', '一般'))
})

test('should find noun frequency', t => {
  const expected = [
    ['水瀬伊織', 1],
    ['ゲーム', 1],
    ['アイドルマスター', 1],
    ['の登場人物', 1],
    ['765プロダクション 所属 アイドル 候補生', 1]
  ]
  const nounFrequency = [...t.context.meCab.nounFrequency()]

  t.deepEqual(nounFrequency, expected)
})

class StubMeCabFrequency extends MeCabFrequency {
  constructor() {
    super('')
  }

  parseMeCabData() {
    return [
      ['水瀬伊織', '名詞', '固有名詞', '一般', '*', '*', '*', '水瀬伊織', 'ミナセイオリ', 'ミナセイオリ'],
      ['（', '記号', '括弧開', '*', '*', '*', '*', '（', '（', '（'],
      ['みなせ', '動詞', '自立', '*', '*', '一段', '連用形', 'みなせる', 'ミナセ', 'ミナセ'],
      ['い', '動詞', '非自立', '*', '*', '一段', '連用形', 'いる', 'イ', 'イ'],
      ['おり', '動詞', '非自立', '*', '*', '五段・ラ行', '連用形', 'おる', 'オリ', 'オリ'],
      ['）', '記号', '括弧閉', '*', '*', '*', '*', '）', '）', '）'],
      ['は', '助詞', '係助詞', '*', '*', '*', '*', 'は', 'ハ', 'ワ'],
      ['、', '記号', '読点', '*', '*', '*', '*', '、', '、', '、'],
      ['ゲーム', '名詞', '一般', '*', '*', '*', '*', 'ゲーム', 'ゲーム', 'ゲーム'],
      ['『', '記号', '括弧開', '*', '*', '*', '*', '『', '『', '『'],
      ['アイドルマスター', '名詞', '固有名詞', '一般', '*', '*', '*', 'THE IDOLM@STER', 'アイドルマスター', 'アイドルマスター'],
      ['』', '記号', '括弧閉', '*', '*', '*', '*', '』', '』', '』'],
      ['の登場人物', '名詞', '固有名詞', '一般', '*', '*', '*', 'の登場人物', 'ドクガンリュウマサムネノトウジョウジンブツ', 'ドクガンリュウマサムネノトージョージンブツ'],
      ['で', '助詞', '格助詞', '一般', '*', '*', '*', 'で', 'デ', 'デ'],
      ['、', '記号', '読点', '*', '*', '*', '*', '、', '、', '、'],
      ['765プロダクション', '名詞', '固有名詞', '一般', '*', '*', '*', '765プロダクション', 'ナムコプロダクション', 'ナムコプロダクション'],
      ['所属', '名詞', 'サ変接続', '*', '*', '*', '*', '所属', 'ショゾク', 'ショゾク'],
      ['アイドル', '名詞', '一般', '*', '*', '*', '*', 'アイドル', 'アイドル', 'アイドル'],
      ['候補生', '名詞', '固有名詞', '一般', '*', '*', '*', '候補生', 'コウホセイ', 'コーホセイ'],
      ['の', '助詞', '連体化', '*', '*', '*', '*', 'の', 'ノ', 'ノ'],
      ['一', '名詞', '数', '*', '*', '*', '*', '一', 'イチ', 'イチ'],
      ['人', '名詞', '接尾', '助数詞', '*', '*', '*', '人', 'ニン', 'ニン'],
      ['で', '助動詞', '*', '*', '*', '特殊・ダ', '連用形', 'だ', 'デ', 'デ'],
      ['ある', '助動詞', '*', '*', '*', '五段・ラ行アル', '基本形', 'ある', 'アル', 'アル'],
      ['。', '記号', '句点', '*', '*', '*', '*', '。', '。', '。']
    ]
  }
}
