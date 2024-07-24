
class Button {
  render() {
    return {
      type: "button",
      props: {
        style: {
          "background-color": "red",
        },
        ...this.props,
      },
      events: {
        click: [this.props.onClick],
      },
      children: [
        {
          type: "TEXT_NODE",
          content: this.props.title,
        },
      ],
    };
  }
}

export default Button;
