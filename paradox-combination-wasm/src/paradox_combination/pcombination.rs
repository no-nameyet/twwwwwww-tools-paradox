use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use std::rc::Rc;

/// フィルタ条件
#[derive(Deserialize)]
pub struct FilterCondition {
	pub min_skill_bound: usize,
	pub max_skill_bound: usize,
	pub include_skills: Vec<u64>,
}

/// パラドクスの構造体
#[derive(Deserialize, Serialize, Clone)]
pub struct Paradox {
	pub id: u64,
	pub skills: Vec<u64>,
}

/// パラドクスの組み合わせを生成する
pub fn combination(paradox_list: Vec<Vec<Paradox>>, filter: FilterCondition, limit: usize) -> Vec<Vec<u64>> {
	let mut results = Vec::new();
	// 組み合わせ判定処理
	// (現在のパラドクス, 現在のスキル, 次に試すインデックス)
	let mut stack = vec![
		(Rc::new(vec![]), Rc::new(HashSet::new()), 0)
	];
	while let Some((stack_paradox, stack_skills, stack_index)) = stack.pop() {
		let depth = stack_paradox.len();
		// 完成したら結果に push
		if depth == paradox_list.len() {
			let now_skills: &HashSet<u64> = &*stack_skills;
			// スキル件数が下限以上でなければ処理をしない
			if now_skills.len() < filter.min_skill_bound {
				continue;
			}
			// 必須スキルが揃っていなければスキップ
			if !filter.include_skills.iter().all(|skill_id| now_skills.contains(skill_id)) {
				continue;
			}
			results.push((*stack_paradox).clone());
			// スキルが上限を超過した場合は終了
			if results.len() > limit {
				break;
			}
			continue;
		}
		// 組み合わせを検証
		for idx in stack_index..paradox_list[depth].len() {
			let paradox = &paradox_list[depth][idx];
			// ID の重複チェック
			if stack_paradox.iter().any(|id| id == &paradox.id) {
				continue;
			}
			// スキルを結合して重複排除
			let mut new_skills = (*stack_skills).clone();
			new_skills.extend(paradox.skills.iter().cloned());
			// スキル数が上限を超えていなければ深い階層へ
			if new_skills.len() <= filter.max_skill_bound {
				// 新しいパラドクスの組み合わせを作成
				let mut new_paradox = (*stack_paradox).clone();
				new_paradox.push(paradox.id.clone());
				// スタックに push
				stack.push((Rc::clone(&stack_paradox), Rc::clone(&stack_skills), idx + 1));
				stack.push((
					Rc::new(new_paradox),
					Rc::new(new_skills),
					0,
				));
				break;
			}
		}
	}
	results
}
