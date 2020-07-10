---
name: Beta
type: continuous/bounded
families:
- exponential
class: continuous.Beta
macros:
    BetaD: \mathrm{Beta}
---

The Beta distribution $\BetaD(\alpha, \beta)$ is a continuous distribution over real numbers in the interval $[0,1]$.

The Beta distribution arises from Bayesian inference over a binomial process like a weighted coin flip.  It describes our inference of the process's success probability given that we have seen $\alpha - 1$ successes and $\beta - 1$ failures.  $\BetaD(1, 1)$ is flat, indicating no knowledge of the actual success probability except that both success and failure are possible.

## Parameters

Shape
:   $\alpha, \beta > 0$

## Distribution Function

The beta distribution has the following probability density function:

$$
p(x) = \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha)\Gamma(\beta)}
x^{(\alpha - 1)}(1-x)^{(\beta - 1)}
$$

This density is closely related to the [binomial distribution](binomial), generalized to real numbers instead of an integer number of trials.  It consistes of two portions:

*  The term $x^{(\alpha - 1)}(1-x)^{(\beta - 1)}$ is the probability of a specific sequence of $\alpha - 1$ successes and $\beta - 1$ failures of a trial with success probability $x$.
*  The term $\frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha)\Gamma(\beta)}$ is a *normalizing constant*.  The Gamma function $\Gamma$ is a real-valued generalization of the factorial, such that $\Gamma(n) = (n-1)!$; if $\alpha$ and $\beta$ are integers, therefore, then this term is equal to $(\alpha + \beta - 1) {\alpha + \beta - 2 \choose \alpha - 1}$.

Why this is the correct scaling factor is discussed below.

The distribution function is the integral:

$$
\P[X \le x]  = F(x) = \int_0^x x p(x) dx
$$

There are definitions of the distribution function in terms of variants of the beta function $\mathrm{B}$, but those are defined as integrals of the binomial function anyway.

## Statistics

The normal distribution has the following statistics:

Mean / Expectation
:   $\E[X] = \frac{\alpha}{\alpha + \beta}$

Variance
:   $\E[(X-\E[X])^2] = \frac{\alpha\beta}{(\alpha + \beta)^2 (\alpha + \beta + 1)}$

## Families

The normal distribution is a member of the following families:

* The [exponential family](families/exponential)

## Related Distributions

* The beta distribution is a [conjugate prior](/concepts/conjugate) for the [binomial distribution](binomial).
