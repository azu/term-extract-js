"use strict";
import { getTokenizer } from "kuromojin"

let _tokenizer = null;

export function ready() {
    if (_tokenizer) {
        return Promise.resolve(_tokenizer);
    }
    return getTokenizer().then((tokenizer) => {
        _tokenizer = tokenizer
    });
}

/*
[ {
    word_id: 509800,          // 辞書内での単語ID
    word_type: 'KNOWN',       // 単語タイプ(辞書に登録されている単語ならKNOWN, 未知語ならUNKNOWN)
    word_position: 1,         // 単語の開始位置
    0: surface_form: '黒文字',    // 表層形
    1: pos: '名詞',               // 品詞
    2: pos_detail_1: '一般',      // 品詞細分類1
    3: pos_detail_2: '*',        // 品詞細分類2
    4: pos_detail_3: '*',        // 品詞細分類3
    5: conjugated_type: '*',     // 活用型
    6: conjugated_form: '*',     // 活用形
    7: basic_form: '黒文字',      // 基本形
    8: reading: 'クロモジ',       // 読み
    9: pronunciation: 'クロモジ'  // 発音
  } ]


[ [ 'いつも', '副詞', '一般', '*', '*', '*', '*', 'いつも', 'イツモ', 'イツモ' ],
  [ 'ニコニコ', '副詞', '助詞類接続', '*', '*', '*', '*', 'ニコニコ', 'ニコニコ', 'ニコニコ' ],
  [ 'あなた', '名詞', '代名詞', '一般', '*', '*', '*', 'あなた', 'アナタ', 'アナタ' ],
  [ 'の', '助詞', '連体化', '*', '*', '*', '*', 'の', 'ノ', 'ノ' ],
  [ '隣', '名詞', '一般', '*', '*', '*', '*', '隣', 'トナリ', 'トナリ' ],
  [ 'に', '助詞', '格助詞', '一般', '*', '*', '*', 'に', 'ニ', 'ニ' ],
  [ '這い', '動詞', '自立', '*', '*', '五段・ワ行促音便', '連用形', '這う', 'ハイ', 'ハイ' ],
  [ '寄る', '動詞', '自立', '*', '*', '五段・ラ行', '基本形', '寄る', 'ヨル', 'ヨル' ],
  [ '混沌', '名詞', '一般', '*', '*', '*', '*', '混沌', 'コントン', 'コントン' ],
  [ 'ニャルラトホテプ', '名詞', '一般', '*', '*', '*', '*', '*' ],
  [ 'です', '助動詞', '*', '*', '*', '特殊・デス', '基本形', 'です', 'デス', 'デス' ],
  [ '！', '記号', '一般', '*', '*', '*', '*', '！', '！', '！' ] ]
 */

export function convertKuromojiToMecabAsyncResult(result) {
    return [
        result.surface_form,
        result.pos,
        result.pos_detail_1,
        result.pos_detail_2,
        result.pos_detail_3,
        result.conjugated_type,
        result.conjugated_form,
        result.basic_form,
        result.reading,
        result.pronunciation,
    ]
}

export function parse(text) {
    if (!_tokenizer) {
        throw new Error("Please call ready().");
    }

    return _tokenizer.tokenize(text).map((result) => {
        return convertKuromojiToMecabAsyncResult(result);
    });
}