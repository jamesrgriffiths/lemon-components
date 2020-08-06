<!--
  Creates a navigation menu that slides out of the side of the screen based on the following parameters:
  links - (REQUIRED) This can either be an array of strings or objects.
    - A string in this array will be used for both the display and link (the display will be formatted to remove underscores and capitalize)
    - An object in the array should have the following: display, value
    - An object in the array can have the following: icon (the class name of the fontawesome icon to use), function (javascript code to run instead of using a link)
  side - (OPTIONAL - DEFAULT left, OPTIONS [left,right]) The side the menu will slide out from.
  showIcons (show-icons) - (OPTIONAL - DEFAULT true, OPTIONS [true,false]) Whether or not to show the passed in icons.
  onlyIcons (only-icons) - (OPTIONAL - DEFAULT false, OPTIONS [true,false]) Whether or not to only show the passed in icons. will change the size of the menu.

  **The following options are for determining the dark/light mode of various buttons***
  buttonStyleHamburger (button-style-hamburger) - (OPTIONAL - DEFUALT auto, OPTIONS [auto,invert,light,dark])
  buttonStyleX (button-style-x) - (OPTIONAL - DEFUALT auto, OPTIONS [auto,invert,light,dark])
  buttonStyleItem (button-style-item) - (OPTIONAL - DEFUALT auto, OPTIONS [auto,invert,light,dark])
 -->
<template>

  <div>
    <span :class="'lemon-icon-button-'+buttonStyleHamburger" @click="toggleMenu()"><i class="fas fa-bars"></i></span>
    <div class="ms-menu" :class="class_side+' '+class_icons_only+' '+class_visible">
      <div>
        <span :class="'lemon-icon-button-'+buttonStyleX" @click="toggleMenu()"><i class="fas fa-times"></i></span>
      </div>
      <div class="lemon-accent-line"></div>
      <div v-for="link in links"
        :class="'ms-icon-button lemon-icon-button-'+buttonStyleItem"
        :onclick="link.function ? link.function : link.value ? 'window.location.href=\''+link.value+'\'' : 'window.location.href=\''+link+'\''">
        <div v-if="showIcons" :class="'ms-icon-button-icon'"><i v-if="link.icon" :class="'fas '+link.icon"></i></div>
        <span v-if="!onlyIcons" :class="link.display ? '' : 'capitalize'">
          {{link.display ? link.display : linkDisplay(link)}}
        </span>
      </div>


    </div>
  </div>

</template>

<script>
  export default {
    props: {
      links: { default: () => [] },
      side: {
        default: "left",
        validator(x) { return ["left","right"].indexOf(x) !== -1; }
      },
      showIcons: {
        default: true,
        validator(x) { return [true,false].indexOf(x) !== -1; }
      },
      onlyIcons: {
        default: false,
        validator(x) { return [true,false].indexOf(x) !== -1; }
      },
      buttonStyleHamburger: {
        default: "auto",
        validator(x) { return ["auto","invert","light","dark"].indexOf(x) !== -1; }
      },
      buttonStyleX: {
        default: "auto",
        validator(x) { return ["auto","invert","light","dark"].indexOf(x) !== -1; }
      },
      buttonStyleItem: {
        default: "auto",
        validator(x) { return ["auto","invert","light","dark"].indexOf(x) !== -1; }
      },
    },

    data() {
      return {
        visible: false,

        class_side: 'ms-menu-'+this.side,
        class_icons_only: this.onlyIcons ? 'ms-menu-'+this.side+'-icons-only' : '',
        class_visible: this.visible ? 'ms-menu-'+this.side+'-visible' : '',
      }
    },

    methods: {

      linkDisplay(link) {
        return link.replace("_"," ");
      },

      toggleMenu() {
        this.visible = !this.visible;
        this.class_visible = this.visible ? 'ms-menu-'+this.side+'-visible' : '';
      }

    }
  };
</script>
