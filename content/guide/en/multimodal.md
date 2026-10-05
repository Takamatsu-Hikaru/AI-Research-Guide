# Multimodal models: connecting images and language

Give a model an image and ask what the person on the left is holding. It must connect visual information to the question. Captioning, image–text retrieval, and video understanding involve related connections.

## CLIP and LLaVA: matching and question answering

[CLIP](https://github.com/openai/CLIP) introduces aligning representations through image–text matching. [LLaVA](https://llava-vl.github.io/) shows how images connect to a language model and instruction data teaches answering.

Follow image encoding, representation conversion, and language output with [Hugging Face's VLM explanation](https://huggingface.co/blog/vlms). Revisit [vision](vision.md), [LLMs](llm.md), or [foundations](basics.md) where needed.

## Change an image and inspect the answer

Choose an image with clear answers. Ask about objects, counts, positions, and text. Change one detail and see whether the answer changes. Save questions, images, and raw responses.

This helps reveal whether the model uses the image or guesses from language. Turning an observation into research requires control of samples, tasks, and comparisons; see [experiments](experiments.md).

## Multimodal papers and applications

The [multimodal LLM paper index](https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models) helps locate particular tasks. For making images, see [generation](generation.md); for connecting vision and language to action, see [embodied AI](embodied.md).

## Encoder design and system costs

[Purshow's Encoder-Free analysis](blogs.md#purshow) explains design through workload and parallel scheduling. More courses, papers, and projects are in the [multimodal catalog](catalog-directions.md#topic-15).
