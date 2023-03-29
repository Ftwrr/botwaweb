import fetch from 'node-fetch'

export default async function instagramGetUrl(url) {
  const response = await fetch(`https://igdl.in/apis.php?url=${url}`);
  if (response.status !== 200) return {
    status: response.status,
    statusText: response.statusText
  };
  const data = await response.json();
  const graphql = data.graphql;
  if (!graphql) return {
    status: false,
    statusText: data.message
  }
  let type = graphql.shortcode_media.__typename;
  let arr = [];
  if (type == 'GraphVideo') {
    arr = [...arr, graphql.shortcode_media.video_url];
  } else if (type == 'GraphImage') {
    arr = [...arr, graphql.shortcode_media.display_resources[0].src];
  } else if (type == 'GraphSidecar') {
    const edges = graphql.shortcode_media.edge_sidecar_to_children.edges;
    for (let x of edges) {
      type = x.node.__typename;
      if (type == 'GraphVideo') {
        arr = [...arr, x.node.video_url];
      } else if (type == 'GraphImage') {
        arr = [...arr, x.node.display_resources[0].src];
      }
    }
  }
  return {
    status: true,
    statusText: response.statusText,
    caption: graphql.caption.text,
    media: arr
  };
}