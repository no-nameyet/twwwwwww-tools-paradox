use wasm_bindgen::prelude::*;
mod paradox_combination;
use paradox_combination::pcombination::{combination, FilterCondition, Paradox};
use wasm_bindgen::JsValue;
use serde_wasm_bindgen::{from_value, to_value};

///
/// パラドクスの組み合わせ最適化を実行するWASM
///
#[wasm_bindgen]
pub fn paradox_combination(
	paradox_list_js: JsValue,
	filter_js: JsValue,
	limit: usize,
) -> Result<JsValue, JsValue> {
	// 引数のデシリアライズ
	let paradox_list: Vec<Vec<Paradox>> = from_value(paradox_list_js)?;
	let filter: FilterCondition = from_value(filter_js)?;
	// 絞り込み処理
	let result: Vec<Vec<u64>> = combination(paradox_list, filter, limit);
	// 結果の返却
	Ok(to_value(&result)?)
}
