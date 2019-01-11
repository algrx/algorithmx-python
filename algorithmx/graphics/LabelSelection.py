from typing import Union, Tuple, TypeVar

from .Selection import Selection
from .types import ElementArg, NumExpr
from .utils import attr_event

S = TypeVar('S', bound='LabelSelection')

class LabelSelection(Selection):
    def text(self: S, text: ElementArg[str]) -> S:
        """
        Sets the text displayed by the label. The newline character ("\\\\n") can be used to break the text into multiple lines.
        Note that text cannot be animated or highlighted.

        :param text: The text displayed by the label.
        :type text: :data:`~graphics.types.ElementArg`\\[str]
        """
        self._context.client.dispatch(attr_event(self._context, text, lambda d: {'text': d}))
        return self

    def align(self: S, align: ElementArg[str]) -> S:
        """
        Sets alignment of the label's text. This will affect the direction in which text is appended, as well as its
        positioning relative to the label's base position. For example, an alignment of "top-left" will ensure that the top
        left corner of the label is located at its base position.

        A special "radial" alignment can be used to dynamically calculate the label's alignment based on its :meth:`~graphics.LabelSelection.angle`
        and :meth:`~graphics.LabelSelection.rotate` attributes, such that text is optimally positioned around an element.

        :param align: A string describing the alignment, typically in the form "vertical-horizontal". The full list is below:

            "top-left", "top-middle", "top-right",
            "middle-left", "middle", "middle-right",
            "bottom-left", "bottom-middle", "bottom-right",
            "radial".

        :type align: :data:`~graphics.types.ElementArg`\\[str]
        """
        self._context.client.dispatch(attr_event(self._context, align, lambda d: {'align': d}))
        return self

    def pos(self: S, pos: ElementArg[Tuple[NumExpr, NumExpr]]) -> S:
        """
        Sets the position of the the label relative to its parent element. This will always involve a Cartesian coordinate
        system. If the parent is a node, (0, 0) will be its center. If the parent is an edge connecting two nodes, (0, 0)
        will be the midpoint between the two nodes. If the parent is a looping edge connecting one node, (0, 0) will be a
        point along the node's boundary, in the direction of the edge.

        :param pos: An (x, y) tuple describing the position of the label.
        :type pos: :data:`~graphics.types.ElementArg`\\[Tuple[:data:`~graphics.types.NumExpr`, :data:`~graphics.types.NumExpr`]]
        """
        self._context.client.dispatch(attr_event(self._context, pos, lambda d: {'pos': d}))
        return self

    def radius(self: S, radius: ElementArg[NumExpr]) -> S:
        """
        Allows the label to be positioned using polar coordinates, together with the :meth:`~graphics.LabelSelection.angle` attribute.
        This will specify the distance from the label's base position (see :meth:`~graphics.LabelSelection.pos`).

        :param radius: The polar radius, defined as the distance from the label's base position.
        :type radius: :data:`~graphics.types.ElementArg`\\[:data:`~graphics.types.NumExpr`]
        """
        self._context.client.dispatch(attr_event(self._context, radius, lambda d: {'radius': d}))
        return self

    def angle(self: S, angle: ElementArg[NumExpr]) -> S:
        """
        Allows the label to be positioned using polar coordinates, together with the :meth:`~graphics.LabelSelection.radius` attribute.
        This will specify the angle, in degrees, along a standard unit circle centered at the label's base position
        (see :meth:`~graphics.LabelSelection.pos`).

        Additionally, this will affect the rotation of the label, if enabled (see :meth:`~graphics.LabelSelection.rotate`).

        :param angle: The polar angle, in degrees, increasing counter-clockwise from the x-axis.
        :type angle: :data:`~graphics.types.ElementArg`\\[:data:`~graphics.types.NumExpr`]
        """
        self._context.client.dispatch(attr_event(self._context, angle, lambda d: {'angle': d}))
        return self

    def rotate(self: S, rotate: ElementArg[bool]) -> S:
        """
        Sets whether or not the label should rotate, using its :meth:`~graphics.LabelSelection.angle` attribute. The exact rotation
        will also depend on the label's alignment. For example, an alignment of "top-center" together with an angle of 90
        degrees will result in the text being upside-down.

        :param rotate: Whether or not the label should rotate.
        :type rotate: :data:`~graphics.types.ElementArg`\\[bool]
        """
        self._context.client.dispatch(attr_event(self._context, rotate, lambda d: {'rotate': d}))
        return self

    def color(self: S, color: ElementArg[str]) -> S:
        """
        Sets the color of the label's text.

        :param color: A CSS color string.
        :type color: :data:`~graphics.types.ElementArg`\\[str]
        """
        self._context.client.dispatch(attr_event(self._context, color, lambda d: {'color': d}))
        return self

    def font(self: S, font: ElementArg[str]) -> S:
        """
        Sets the font of the label's text.

        :param font: A CSS font-family string.
        :type font: :data:`~graphics.types.ElementArg`\\[str]
        """
        self._context.client.dispatch(attr_event(self._context, font, lambda d: {'font': d}))
        return self

    def size(self: S, size: ElementArg[NumExpr]) -> S:
        """
        Sets the size of the label's text.

        :param size: The size of the label's text, in pixels.
        :type size: :data:`~graphics.types.ElementArg`\\[:data:`~graphics.types.NumExpr`]
        """
        self._context.client.dispatch(attr_event(self._context, size, lambda d: {'size': d}))
        return self

    def svgattr(self: S, key: str, value: ElementArg[Union[str, int, float, None]]):
        """
        Sets a custom SVG attribute on the label's text.

        :param key: The name of the SVG attribute.
        :type key: str

        :param value: The value of the SVG attribute.
        :type value: :data:`~graphics.types.ElementArg`\\[Union[str, int, float, None]]
        """
        self._context.client.dispatch(attr_event(self._context, value, lambda d: {'svgattr': {key: d}}))
        return self
