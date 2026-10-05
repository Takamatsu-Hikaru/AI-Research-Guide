# Computer vision: understanding images

What is in a photo, where is it, which pixels belong to an object, and how can images reveal a 3D scene? Vision makes an inviting entry point because you can see what a model gets right and wrong.

## Start with classification, detection and segmentation

Start with [MNIST digit recognition or YOLO object detection](start.md). The former takes you through training, prediction, and a Kaggle submission; the latter begins with detections on your own photos, then training. Follow with the vision-task, training, and convolutional-network sections of [CS231n](https://cs231n.stanford.edu/schedule).

Classification asks what, detection also asks where, and segmentation assigns meaning to individual pixels. Choose one task and examine its data and metrics.

## Features, receptive fields and generalization

[ResNet](https://arxiv.org/abs/1512.03385) shows how an architectural change can be supported experimentally. For receptive fields, read [Distill's visual explanation](https://distill.pub/2019/computing-receptive-fields/).

Inspect a prediction: what cases go wrong, does hiding the background change it, and what happens with another data source? Such observations lead to data, representations, and generalization.

## Vision connects to language, generation and action

Connect images and language through [multimodal models](multimodal.md), make images through [generation](generation.md), and connect vision to action through [embodied AI](embodied.md). For runtime and memory, see [systems](systems.md).

## Vision courses and research groups

Courses and projects are in the [vision catalog](catalog-directions.md#topic-13). For connections to robot tasks, start with [SVL, RAIL, and other labs](labs.md).
