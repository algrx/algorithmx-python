from typing import Union, Tuple, TypeVar

from .ElementSelection import ElementSelection
from .types import ElementArg, NumAttr

S = TypeVar("S", bound="LabelSelection")


class LabelSelection(ElementSelection):
    def text(self: S, text: ElementArg[str]) -> S:
        """Sets the text displayed by the label.

        The newline character ("\\\\n") can be used to break the text into multiple
        lines.

        :param text: The text displayed by the label.
        :type text: :data:`~api.types.ElementArg`\\[str]
        """
        return self.attrs(text=text)

    def align(self: S, align: ElementArg[str]) -> S:
        """Sets alignment of the label's text.

        This will affect the direction in which text is appended, as well as its
        positioning relative to the label's base position. For example, an alignment of
        "top-left" will ensure that the top left corner of the label is located at the
        base position.

        A special "radial" alignment can be used to dynamically calculate the label's
        alignment based on its :meth:`~api.LabelSelection.angle` and
        :meth:`~api.LabelSelection.rotate` attributes, such that text is optimally
        positioned around an element.

        :param align: A string describing the alignment, typically in the form
            "vertical-horizontal". The full list is below:

            "top-left", "top-middle", "top-right", "middle-left", "middle",
            "middle-right", "bottom-left", "bottom-middle", "bottom-right", "radial"

        :type align: :data:`~api.types.ElementArg`\\[str]
        """
        return self.attrs(align=align)

    def pos(self: S, pos: ElementArg[Tuple[NumAttr, NumAttr]]) -> S:
        """Sets the position of the label relative to its parent element.

        If the parent is a node, (0,0) will be the node's center. If the parent is an
        edge connecting two nodes, (0,0) will be the midpoint between the two nodes. If
        the parent is a looping edge connecting one node, (0,0) will be a point on the
        node's boundary.

        :param pos: An (x, y) tuple describing the position of the label.
        :type pos: :data:`~api.types.ElementArg`\\[Tuple[:data:`~api.types.NumAttr`, :data:`~api.types.NumAttr`]]
        """
        return self.attrs(pos=pos)

    def radius(self: S, radius: ElementArg[NumAttr]) -> S:
        """Positions the label using polar coordinates, together with
        :meth:`~api.LabelSelection.angle`. This will specify the distance from the
        label's base position (see :meth:`~api.LabelSelection.pos`).

        :param radius: The polar radius, defined as the distance from the label's base position.
        :type radius: :data:`~api.types.ElementArg`\\[:data:`~api.types.NumAttr`]
        """
        return self.attrs(radius=radius)

    def angle(self: S, angle: ElementArg[NumAttr]) -> S:
        """Allows the label to be positioned using polar coordinates, together with the
        :meth:`~api.LabelSelection.radius` attribute. This will specify the angle, in
        degrees, along a standard unit circle centered at the label's base position (see
        :meth:`~api.LabelSelection.pos`).

        This will also affect the rotation of the label if
        :meth:`~api.LabelSelection.rotate` is enabled.

        :param angle: The polar angle, in degrees, increasing counter-clockwise from the x-axis.
        :type angle: :data:`~api.types.ElementArg`\\[:data:`~api.types.NumAttr`]
        """
        return self.attrs(angle=angle)

    def rotate(self: S, rotate: ElementArg[bool]) -> S:
        """Sets whether the label should be rotated by :meth:`~api.LabelSelection.angle`
        degrees.

        The exact rotation will also depend on the label's alignment. For example, an
        alignment of "top-center" together with an angle of 90 degrees will result in
        the text being upside-down.

        :param rotate: True if the label should be rotated.
        :type rotate: :data:`~api.types.ElementArg`\\[bool]
        """
        return self.attrs(rotate=rotate)

    def color(self: S, color: ElementArg[str]) -> S:
        """Sets the color of the label's text.

        The default color is "gray" in most cases.

        :param color: A CSS color string.
        :type color: :data:`~api.types.ElementArg`\\[str]
        """
        return self.attrs(color=color)

    def font(self: S, font: ElementArg[str]) -> S:
        """Sets the font of the label's text.

        :param font: A CSS font-family string.
        :type font: :data:`~api.types.ElementArg`\\[str]
        """
        return self.attrs(font=font)

    def size(self: S, size: ElementArg[NumAttr]) -> S:
        """Sets the size of the label's text.

        :param size: The size of the label's text, in pixels.
        :type size: :data:`~api.types.ElementArg`\\[:data:`~api.types.NumAttr`]
        """
        return self.attrs(size=size)
