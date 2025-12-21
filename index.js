document.getElementById("column1").addEventListener("mouseleave", (event) => {event.currentTarget.classList.add('dull')})


// are.na

const blocks =[];

async function getFunkyBlocks(slug) {
    const response = await fetch(
      `https://api.are.na/v2/channels/${slug}`
    );

    console.log(slug)
    const data = await response.json();
    return data.contents.filter(block => block.class !== "Channel" && block.class !== "Media");;
  }


getFunkyBlocks("links-2026").then(blocks => {
    render(blocks);
    console.log(blocks);
});


function render(blocks){
    const container = document.getElementById("arenaContainer");

    for (let i = blocks.length-1; i >= 0 ; i--){
        const arena = document.createElement("div");
        arena.classList.add("arena");

        // image formatting
        if (blocks[i].class === "Image") {
            arena.classList.add("image");

            const img = document.createElement("img");
            img.src = blocks[i].image.display.url;
            img.alt = blocks[i].title || "";
    
            const caption = document.createElement("p");
            caption.classList.add("caption");
            caption.innerHTML = "↑ " + blocks[i].title;
    
            arena.appendChild(img);
            arena.appendChild(caption);
            container.appendChild(arena);
        }
        
        // link formatting
        if (blocks[i].class === "Link") {
            const link = document.createElement("a");
            link.textContent = "-- " + blocks[i].title + "↗";
            link.href = blocks[i].source.url;

            arena.appendChild(link);
            container.appendChild(arena);
        }

        // attachment formatting
        if (blocks[i].class === "Attachment") {
            const img = document.createElement("img");
            img.src = blocks[i].image.display.url;
            img.alt = blocks[i].title || "";
    
            const description = document.createElement("p");
            description.classList.add("caption");
            description.innerHTML = "↑ " + blocks[i].description;
            description.style.marginBottom = "5px";
            
            const source = document.createElement("a");
            source.classList.add("caption");
            source.textContent = "-- Source↗";
            source.href = blocks[i].attachment.url;
            source.target = "_blank";
            // source.style.marginTop = "100px";
            // source.style.backgroundColor = "red";

            arena.appendChild(img);
            arena.appendChild(description);
            arena.appendChild(source);
            container.appendChild(arena);
        }

        // text formatting
        if (blocks[i].class === "Text") {

            if (blocks[i].title !== ""){
                const title = document.createElement("h2");
                title.innerHTML = blocks[i].title;
                title.style.marginBottom = "5px";
                arena.appendChild(title);
            }

            const text = document.createElement("p");
            text.innerHTML = blocks[i].content;
            text.classList.add("noIndent");

            arena.appendChild(text);
            container.appendChild(arena);
        }
    }
}