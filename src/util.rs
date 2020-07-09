pub fn linspace(start: f64, end: f64, n: usize)-> Vec<f64> {
  let mut out = Vec::with_capacity(n);
  let n_f = n as f64;
  let gap = (end - start) / (n_f - 1.0);
  for i in 0..n {
    let i_f = i as f64;
    out.push(start + i_f * gap);
  }
  if n > 1 && end > start && out[n-1] > end {
    out[n-1] = end;
  }
  if n > 1 && start > end && out[n-1] < end {
    out[n-1] = end;
  }
  out
}

#[test]
fn test_linspace_empty() {
  let ls = linspace(0.0, 1.0, 0);
  assert_eq!(ls.len(), 0);
}

#[test]
fn test_linspace_0_1() {
  let ls = linspace(0.0, 1.0, 11);
  assert_eq!(ls.len(), 11);
  assert_eq!(ls[0], 0.0);
  assert_eq!(ls[10], 1.0);
  assert_eq!(ls[1], 0.1);
}
