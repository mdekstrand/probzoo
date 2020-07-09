---
name: Normal
tags: [continuous, unbounded]
macros:
    erf: \mathrm{erf}
class: continuous.Normal
---

## Parameters

Location
:   $\mu \in \Reals$, the mean.

Scale
:   $\sigma > 0$, the standard deviation.  Another common parameterization is to use the variance $\sigma^2$.

## Distribution Function

The normal distribution has the following PDF:

$$
p(x) = \frac{1}{\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma}}
$$

And distribution function:

$$
\P[X \le x] = F(x) = \frac{1}{2}\left[1 + \erf\left(\frac{x - \mu}{\sigma \sqrt{2}}\right)\right]
$$

## Statistics

The normal distribution has the following statistics:

Mean
:   $\mu$

Variance
:   $\sigma^2$

## Related Distributions

Conjugate
:   normal

Conjugate for
:   normal
