const format = (content) => {
  const blocks = Object.keys(content);
  let format = [];
  blocks?.map((block) => {
    const item = content[block].value;
    let generatedBlock = _generateBlock(item);
    if (generatedBlock) format.push(generatedBlock);
  });
  return format;
};

const _generateBlock = (item) => {
  let block;
  if (_isTextContent(item.type)) {
    let text = _getText(item);
    block = {
      id: item.id,
      type: _getType(item.type),
    };
    block[_getType(item.type)] = {
      text: [...text],
    };
  } else if (item.type == "image") {
    block = {
      id: item.id,
      type: "u_image",
      src: _imgLink(item.properties.source[0][0], item.id),
      width: item.format?.block_width,
      height: item.format?.block_height
        ? item?.format?.block_height
        : item?.format?.block_width
        ? item?.format?.block_width / 2
        : 300,
    };
  } else if (item.type == "video") {
    block = {
      id: item.id,
      type: "u_video",
      src: item.format?.display_source,
      width: item.format?.block_width,
      height: item.format?.block_height ? item.format?.block_height : 400,
    };
  } else if (_isEmbed(item.type)) {
    block = {
      id: item.id,
      type: "u_embed",
      src: item.format?.display_source || item.properties?.source[0][0],
      width: item.format?.block_width || 400,
      height: item.format?.block_height || 400,
    };
  } else if (item.type == "toggle") {
    let text = _getText(item);
    block = {
      id: item.id,
      type: "u_toggle",
      content: item.content,
      u_toggle: {
        text: [...text],
      },
    };
  } else if (item.type == "callout") {
    let text = _getText(item);

    block = {
      id: item.id,
      type: "u_callout",
      icon: _isImg(item.format.page_icon)
        ? _imgLink(item.format.page_icon, item.id)
        : item.format.page_icon,
      isImg: _isImg(item.format.page_icon),
      u_callout: {
        text: [...text],
      },
    };
  } else if (item.type == "divider") {
    block = {
      id: item.id,
      type: "u_divider",
    };
  } else if (item.type == "bookmark") {
    block = {
      id: item.id,
      type: "u_bookmark",
      data: {
        title: item.properties.title[0][0],
        description: item.properties.description[0][0],
        link: item.properties.link[0][0],
        icon: item.format.bookmark_icon,
        cover: item.format.bookmark_cover,
      },
    };
  } else if (item.type == "code") {
    block = {
      id: item.id,
      type: "u_code",
      code: item.properties.title[0][0],
      language: item.properties.language[0][0],
    };
  } else if (item.type == "tweet") {
    block = {
      id: item.id,
      type: "u_tweet",
      src: item.properties?.source[0][0],
    };
  } else if (item.type == "drive") {
    block = {
      id: item.id,
      type: "u_drive",
      data: {
        url: item.format?.drive_properties?.url,
        thumbnail: _imgLink(item.format?.drive_properties?.thumbnail, item.id),
        title: item.format?.drive_properties?.title,
        user_name: item.format?.drive_properties?.user_name,
        modified_time: item.format?.drive_properties?.modified_time,
        icon: item.format?.drive_properties?.icon,
      },
    };
  } else if (item.type == "audio") {
    block = {
      id: item.id,
      type: "u_audio",
      data: {
        src: item.properties?.source[0][0],
      },
    };
  } else if (item.type == "file") {
    block = {
      id: item.id,
      type: "u_file",
      data: {
        title: item.properties.title[0][0],
        src: item.properties.source[0][0],
      },
    };
  } else if (item.type == "equation") {
    block = {
      id: item.id,
      type: "u_equation",
      data: {
        equation: item.properties.title[0][0],
      },
    };
  } else if (item.type == "column_list") {
    block = {
      id: item.id,
      type: "u_column_list",
      content: [...item.content],
    };
  } else if (item.type == "column") {
    block = {
      id: item.id,
      type: "u_column",
      content: item.content,
      ratio: item.format?.column_ratio,
    };
  }
  return block;
};

const _isEmbed = (type) => {
  const embedBlocks = [
    "embed",
    "figma",
    "maps",
    "gist",
    "codepen",
    "pdf",
    "typeform",
    "replit",
    "abstract",
    "invision",
    "framer",
    "whimsical",
    "miro",
    "sketch",
    "excalidraw",
    "loom",
  ];
  return embedBlocks.includes(type);
};

const _isTextContent = (type) => {
  const textBlocks = [
    "text",
    "header",
    "sub_header",
    "sub_sub_header",
    "bulleted_list",
    "numbered_list",
    "to_do",
    "quote",
  ];
  return textBlocks.includes(type);
};

const _imgLink = (src, id) => {
  return `https://www.notion.so/image/${encodeURIComponent(
    src
  )}?table=block&id=${id}&cache=v2`;
};

const _isImg = (icon) => {
  return icon.split(":")[0] == "https" ? true : false;
};

const _getType = (type) => {
  let typeName = type;
  switch (type) {
    case "text":
      typeName = "paragraph";
      break;
    case "header":
      typeName = "heading_1";
      break;
    case "sub_header":
      typeName = "heading_2";
      break;
    case "sub_sub_header":
      typeName = "heading_3";
      break;
    case "bulleted_list":
      typeName = "bulleted_list_item";
      break;
    case "numbered_list":
      typeName = "numbered_list_item";
      break;
    case "quote":
      typeName = "u_quote";
      break;
  }
  return typeName;
};

const _getText = (item) => {
  let paragraph = [];
  item.properties?.title?.map((el) => {
    let textBlock = {
      type: el[0] == "⁍" ? "equation" : "text",
      plain_text: el[0] != "⁍" ? el[0] : el[1][0][1],
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      href: null,
    };

    el[1]?.map((annotation) => {
      switch (annotation[0]) {
        case "b":
          textBlock.annotations["bold"] = true;
          break;
        case "i":
          textBlock.annotations["italic"] = true;
          break;
        case "s":
          textBlock.annotations["strikethrough"] = true;
          break;
        case "_":
          textBlock.annotations["underline"] = true;
          break;
        case "c":
          textBlock.annotations["code"] = true;
          break;
        case "h":
          textBlock.annotations["color"] = annotation[1];
          break;
        case "a":
          textBlock.href = annotation[1];
          break;
      }
    });
    paragraph.push(textBlock);
  });
  return paragraph;
};

export { format };
