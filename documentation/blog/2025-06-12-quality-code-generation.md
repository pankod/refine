---
title: "Quality Code Generation: Multi-Agent Systems and Token Dilution"
description: How Refine's multi-agent system architecture effectively tackles token dilution, drastically improving code generation quality.
slug: quality-code-generation
authors: youwei
category: "AI & Innovation"
tags: [ai, tech-industry]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-06-16/cover-1.png
hide_table_of_contents: false
last_update: 2026-02-03
---

Refine.dev has established itself as a leader in React-based enterprise application development with their open-source framework that streamlines CRUD operations, authentication, and state management. Building on this foundation, Refine represents their next evolution—an AI-powered platform that uses natural language to generate production-ready React applications with clean architecture and thoughtful separation of concerns.

Unlike general-purpose AI coding tools that often produce "unstructured code, ad-hoc logic, randomly chosen libraries," Refine follows proven industry best practices to generate maintainable, enterprise-grade code. However, even with this sophisticated approach, we encountered a fundamental challenge: how can AI effectively leverage third-party libraries and complex documentation to build advanced features like dashboards and data analytics?

This technical deep-dive explores our iterative approach to solving token dilution and attention degradation in large language model agents, ultimately achieving a 90% reduction in token consumption while improving code generation quality from 10% to 70% success rate.

## Problem Definition

Large language models and agents face significant challenges when implementing complex dashboard functionality, data analytics, and leveraging libraries to their full potential due to knowledge gaps in specialized domains and niche features. These models require comprehensive reference documentation to operate effectively. While Refine maintains access to its proprietary documentation, it lacks the capability to dynamically access third-party library documentation. Web scraping approaches present substantial limitations including rate limiting, inconsistent documentation structures, and prohibitive scalability constraints when processing comprehensive library ecosystems.

Our proposed solution enables Refine to query example projects utilizing specific libraries and extract relevant implementation patterns. The system functions as a retrieval-augmented generation (RAG) database, returning contextually relevant code examples that align with user feature requests.

## Iteration 1: Single-Shot Reference Retrieval

Our initial implementation utilized a monolithic tool, `get-reference-code`, which accepted user queries and returned complete project codebases. This approach demonstrated critical limitations in token efficiency and attention management.

<div className="centered-image">
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-06-16/iteration_1.png" alt="refineai shadcn example" />
</div>

**Theoretical Advantages**:

- Simplified architecture with minimal complexity
- Complete context availability for comprehensive analysis
- Direct access to full implementation details

**Observed Behavior**:

- Excessive token consumption diluted attention to critical instructions
- Processing overhead from tens of thousands of tokens significantly degraded response latency
- Complex implementation understanding achieved only 10% success rate during evaluation

The fundamental issue centered on attention dilution, where the overwhelming volume of input tokens prevented the model from focusing on essential instructions and implementation patterns. Token counts often exceeded optimal context windows, leading to truncated or incomplete processing of reference materials.

## Iteration 2: Multi-Stage Reference Processing

Recognizing the attention and token efficiency challenges, we implemented a three-stage pipeline: project discovery and description analysis, file enumeration and structure mapping, and selective file content retrieval. This approach aimed to provide granular control over information flow while maintaining comprehensive access to implementation details.

<div className="centered-image">
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-06-16/iteration_2.png" alt="refineai shadcn example" />
</div>

**Theoretical Advantages**:

- Reduced token dilution through staged information processing
- Enhanced decision-making capability through step-by-step analysis
- Selective attention allocation to most relevant implementation files

**Observed Behavior**:

- LLMs consistently exhibited path-of-least-resistance behavior, bypassing critical stages
- Frequent execution of only stages 1 and 2, omitting essential implementation retrieval (stage 3)
- Token dilution persisted due to returning ~25 project descriptions and ~100 file paths per query
- Complex implementation understanding improved marginally to 20% success rate

Despite extensive guideline refinement and constraint implementation, the model's inherent optimization for minimal computational paths resulted in incomplete execution of the three-stage process. The addition of intermediate outputs (project descriptions and file enumerations) paradoxically increased rather than decreased total token consumption, exacerbating the original problem.

## Iteration 3: Isolated Agent Architecture

To address persistent token dilution issues, we introduced a specialized `reference-implementation-agent` operating independently from the primary Refine instance. This architectural separation eliminated historical context overhead by providing the agent with only implementation objectives, reducing token inheritance from previous interactions.

<div className="centered-image">
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-06-16/iteration_3.png" alt="refineai shadcn example" />
</div>

**Theoretical Advantages**:

- Complete isolation from conversation history reduces token overhead
- Specialized agent focus on reference implementation tasks
- Elimination of context pollution from unrelated interactions

**Observed Behavior**:

- Demonstrated sophisticated query refinement and iterative search behavior
- Logical file selection and comprehensive reference material compilation
- Significant error rates requiring ~20 agent cycles for dashboard implementation completion
- Peak resource consumption of ~2,000,000 input tokens and ~100,000 output tokens

While this approach successfully improved implementation quality, the iterative error-correction cycles created exponential token consumption patterns. The agent's thoroughness in research and reference compilation came at substantial computational cost, highlighting the need for further architectural optimization.

## Iteration 4: Distributed Multi-Agent System

Our final iteration implemented a microservices-inspired architecture, decomposing the reference system into specialized agents: `reference-research-agent` and `reference-implement-agent`. This separation follows the principle that reduced error rates directly correlate with decreased token consumption requirements.

The `reference-research-agent` executes project discovery and file identification phases, maintaining a curated list of relevant implementation files without retrieving content. The `reference-implement-agent` subsequently processes the research output, fetching specific file contents and implementing requested features. This architecture ensures that research process tokens remain isolated from implementation context, significantly reducing attention dilution.

<div className="centered-image">
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-06-16/iteration_4.png" alt="refineai shadcn example" />
</div>

**Theoretical Advantages**:

- Modular responsibility separation reduces cognitive load per agent
- Research artifacts transfer without process overhead
- Specialized optimization for distinct operational phases

**Observed Behavior**:

- `reference-research-agent`: Maximum 70,000 input tokens, 10,000 output tokens
- `reference-implement-agent`: Peak 200,000 input tokens, 50,000 output tokens
- 90% reduction in total token consumption compared to iteration 3
- Substantially fewer error cycles due to focused attention allocation
- Maintained 80% complex implementation understanding success rate with improved efficiency

## Technical Analysis and Insights

The progression from monolithic to distributed architecture reveals critical insights about large language model attention mechanisms and token efficiency. Our data demonstrates an inverse relationship between token volume and implementation quality until optimization through architectural separation. The **7x** improvement in success rate (**10% to 80%**) occurred alongside a **90%** reduction in peak token consumption, suggesting that attention quality rather than information quantity drives implementation success.

Error cycle analysis indicates that token dilution creates cascading failure patterns, where initial implementation errors compound due to degraded attention on correction attempts. The distributed approach breaks this cycle by maintaining focused attention throughout the implementation pipeline.

<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', flexWrap: 'wrap'}}>
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-06-16/chart_1.png" alt="Analysis 1" style={{width: '45%'}} />
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-06-16/chart_2.png" alt="Analysis 2" style={{width: '45%'}} />
</div>

## Conclusion

Token dilution in large language model systems can be effectively mitigated through microservices-inspired multi-agent architectures that implement divide-and-conquer strategies for complex problem domains. Our distributed approach not only reduces token consumption by over **90%** but also improves code generation quality and reliability, advancing Refine toward its objective of generating production-ready enterprise applications that developers can confidently deploy and extend.

The success of this architecture suggests broader applicability to other AI-powered development tools facing similar attention and context management challenges. Future work will explore dynamic agent scaling and intelligent task distribution to further optimize resource utilization while maintaining implementation quality.
